// @ts-nocheck

import { WebhookEvent } from '@clerk/nextjs/webhooks'
import { Webhook } from 'svix'
import { NextRequest } from 'next/server'
import { db } from '../../../../../lib/db'

export async function POST(req: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    
    if (!WEBHOOK_SECRET) {
      console.error('CLERK_WEBHOOK_SECRET is not configured')
      return new Response('Webhook secret not configured', { status: 500 })
    }
    
    const svix_id = req.headers.get("svix-id")
    const svix_timestamp = req.headers.get("svix-timestamp")
    const svix_signature = req.headers.get("svix-signature")
    
    console.log("Headers received:", { svix_id, svix_timestamp, svix_signature })
    
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers')
      return new Response('Error occurred -- no svix headers', {
        status: 400
      })
    }
    
    // Get the body
    let payload
    try {
      payload = await req.json()
      console.log("Payload received:", payload)
    } catch (error) {
      console.error('Error parsing request body:', error)
      return new Response('Invalid JSON payload', { status: 400 })
    }
    
    const body = JSON.stringify(payload)
    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent
    
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id, 
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature
      }) as WebhookEvent
      console.log("Webhook verified successfully")
    } catch (err) {
      console.error("Error verifying webhook:", err)
      return new Response('Error occurred during verification', {
        status: 400
      })
    }
    
    const eventType = evt.type
    const eventData = evt.data
    
    console.log("Event type:", eventType)
    console.log("Event data:", eventData)
    
    try {
      switch (eventType) {
        case 'user.created':
          console.log("Processing user.created event")
          
          // Safely extract user data with fallbacks
          const userId = eventData.id
          const username = eventData.username || eventData.first_name || `user_${userId.slice(-8)}`
          const imageUrl = eventData.image_url || eventData.profile_image_url || ''
          
          console.log("Creating user with data:", { userId, username, imageUrl })
          
          await db.user.create({
            data: {
              externalUserId: userId as string,
              username: username,
              imageURL: imageUrl,
              stream: {
                create: {
                  name: username,
                } 
              },
            }
          })
          console.log(`User ${userId} created successfully`)
          break;
          
        case "user.updated":
          console.log("Processing user.updated event")
          
          const updateUserId = eventData.id
          const updateUsername = eventData.username  || eventData.first_name || `user_${updateUserId.slice(-8)}`
          const updateImageUrl = eventData.image_url || eventData.profile_image_url || ''
          
          console.log("Updating user with data:", { updateUserId, updateUsername, updateImageUrl })
          
          // Check if user exists first
          const existingUser = await db.user.findUnique({
            where: {
              externalUserId: updateUserId,
            }
          })
          
          if (!existingUser) {
            console.log(`User ${updateUserId} not found for update, creating instead`)
            // Create user if they don't exist
            await db.user.create({
              data: {
                externalUserId: updateUserId as string,
                username: updateUsername,
                imageURL: updateImageUrl,
                stream: {
                  create: {
                    name: updateUsername,
                  } 
                },
              }
            })
          } else {
            // Update existing user
            await db.user.update({
              where: {
                externalUserId: updateUserId,
              }, 
              data: {
                username: updateUsername,
                imageURL: updateImageUrl,
              }
            })
          }
          console.log(`User ${updateUserId} updated successfully`)
          break;
          
        case 'user.deleted':
          console.log("Processing user.deleted event")
          
          const deleteUserId = eventData.id
          console.log("Deleting user:", deleteUserId)
          
          // Check if user exists before attempting to delete
          const userToDelete = await db.user.findUnique({
            where: {
              externalUserId: deleteUserId,
            }
          })
          
          if (userToDelete) {
            await db.user.delete({
              where: {
                externalUserId: deleteUserId,
              },
            })
            console.log(`User ${deleteUserId} deleted successfully`)
          } else {
            console.log(`User ${deleteUserId} not found for deletion`)
          }
          break;
          
        default:
          console.log(`Unhandled event type: ${eventType}`)
      }
      
      return new Response("Webhook processed successfully", { status: 200 })
      
    } catch (dbError) {
      console.error("Database operation failed:", dbError)
      return new Response(`Database error: ${dbError}`, { status: 500 })
    }
    
  } catch (error) {
    console.error("Unexpected error in webhook:", error)
    return new Response(`Unexpected error: ${error}`, { status: 500 })
  }
}