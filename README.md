YouTube Skeleton Clone
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Hello and welcome to my GitHub repository for the YouTube Skeleton Clone project! This is a streamlined version of YouTube that I developed. I’m excited to walk you through how it’s put together, so let’s jump right in!


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Table of Contents
Background
Project Goals
Tech Stack
High-Level Overview
In-Depth Design
Challenges and Future Improvements
Conclusion
References

Background
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

YouTube is a phenomenal platform that allows anyone to upload, watch, rate, share, and comment on videos. However, replicating the entire service is incredibly complex, especially considering its massive daily user base. Instead of building an all-encompassing clone, I focused on a few core capabilities to create a simplified experience.



Project Goals
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Below are the main objectives I aimed to fulfill with this project:

User Authentication: Let users sign in and out via Google accounts.
Video Uploading: Permit authenticated users to upload their videos.
Video Transcoding: Automatically convert videos into various formats (such as 360p and 720p) for broader accessibility.
Video Viewing: Allow both logged-in and guest users to explore and watch videos.


Tech Stack
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Before diving into the system design, here is a quick look at the technologies used:

Video Storage: Google Cloud Storage for hosting original and processed video files.
Event Handling: Cloud Pub/Sub to process video upload events.
Video Processing: Cloud Run instances, using FFmpeg for video transcoding.
Metadata Storage: Firestore to store and manage video metadata.
API: Firebase Functions for a simple backend API.
Web Client: A Next.js application hosted on Cloud Run.
Authentication: Firebase Auth for managing user sign-ins.


High-Level Overview
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

![high-level-architecture](https://github.com/user-attachments/assets/f0e7f68d-727b-4815-92b5-31d001e336ba)

High-Level Architecture Diagram

Here’s a quick snapshot of the project’s overall architecture:

Video Storage (Cloud Storage)
Stores both original (raw) and transcoded video files, offering a scalable and cost-effective approach.

Video Upload Events (Cloud Pub/Sub)
When a user uploads a video, a message is published to a Cloud Pub/Sub topic, ensuring resilient event handling and enabling asynchronous workflows.

Video Processing Workers (Cloud Run)
These workers listen for Pub/Sub messages and use FFmpeg to transcode videos. Cloud Run automatically scales to handle varying workloads. Processed files are then pushed back to Cloud Storage.

Video Metadata (Firestore)
Once transcoding is complete, key data (e.g., title, description) is saved in Firestore. This information is displayed in the web client.

Video API (Firebase Functions)
Provides an API that lets users upload videos and retrieve metadata. This can be extended for more advanced CRUD operations down the line.

Web Client (Next.js / Cloud Run)
A Next.js front end where users can log in, upload videos, and browse content. It runs on Cloud Run.

Authentication (Firebase Auth)
Manages Google Sign-In authentication. Easy to set up and integrate with the web client.

In-Depth Design
User Sign-Up
I used Firebase Auth to handle sign-up via Google accounts. It creates a user record with a unique ID and email address. Any extra user details (e.g., name and profile picture) live in Firestore. Using Firebase Functions to create the user document ensures reliability over purely client-side actions.

Video Upload
Only authenticated users can upload videos, associating each upload with the user’s account and laying the groundwork for features like upload quotas. Google Cloud Storage was chosen due to its ability to handle large files effortlessly. A signed URL is generated for secure uploads, and user authentication is verified before this URL is issued.

Video Processing
As soon as a video is uploaded, processing begins—but this can quickly overwhelm the system if many uploads arrive at once. Therefore, a Cloud Pub/Sub message queue was introduced to separate uploads from processing. This approach offers:



Decoupled upload and processing steps.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Pub/Sub push subscriptions for real-time message delivery to workers.
Automatic message buffering in Pub/Sub, allowing dynamic scaling in Cloud Run.
Once transcoding is finished, the processed videos are placed in a public Cloud Storage bucket, and metadata is stored in Firestore for seamless display in the client.




Challenges and Future Improvements
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Limitations
Long-Lived HTTP Requests

Pub/Sub allows a maximum acknowledgment deadline of 600 seconds, while Cloud Run requests can run for up to 3600 seconds. If processing takes over 600 seconds, Pub/Sub might end the HTTP connection prematurely, leaving messages stuck. A “Pull Subscription” approach would offer more control over when to fetch messages and confirm processing.
Video Processing Failures

If a job fails after the status is set to “processing” in Firestore, the corresponding message could remain stuck in Pub/Sub. One solution is resetting the status to “undefined” when a failure occurs.
File Upload Time Limit

Signed URLs remain valid for 15 minutes. For slower connections, this could be an issue. Luckily, as long as the upload starts within that window, it will continue even if the URL expires afterward.
Video Streaming

By default, Google Cloud Storage offers basic streaming capabilities. However, it lacks more advanced streaming methods like DASH or HLS, which allow adaptive quality and chunked video delivery.
Content Delivery Network

Serving videos via a CDN could greatly enhance performance by reducing latency. Users watching from servers close to their location would have a smoother experience.


Future Work
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Here are a few ideas for improving and expanding the project:

Show user profile pictures and emails in the client.
Allow multiple video uploads without refreshing.
Let users upload custom thumbnails.
Enable editing of titles and descriptions.
Display uploader information for each video.
Implement channel subscriptions.
Schedule automatic cleanup of raw videos in Cloud Storage once processing is complete.
Add a CDN to further reduce latency and improve streaming.
Introduce unit and integration tests to boost code quality.


Conclusion
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Thank you for taking the time to explore this YouTube Skeleton Clone project! I hope you found it useful for understanding different architecture and design considerations. Constructing an app akin to YouTube or Twitter can be a massive venture that requires significant effort and strategic decisions.

I’m always looking to improve, so I greatly value your feedback. If you have any thoughts or suggestions, please feel free to let me know!




References
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

This project was built with insights from these resources:

Neetcode’s Full Stack Development Course
Firebase Auth Documentation
Cloud Storage Signed URLs
Pub/Sub Push Subscriptions
Using Pub/Sub with Cloud Storage
Using Pub/Sub with Cloud Run
