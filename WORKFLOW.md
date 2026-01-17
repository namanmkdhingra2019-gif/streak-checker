# CarpetViz: AI-Powered Rug Visualization Platform Workflow

This document outlines the production-ready workflow for **CarpetViz**, a luxury e-commerce platform that integrates advanced AI visualization.

---

## 1. Core User Journey

The following diagram represents the end-to-end user experience from discovery to purchase.

```mermaid
graph TD
    %% Entry Point
    Start((User Entry)) --> Home[Home Page]

    %% Discovery
    Home -->|Hero CTA| Category[Category Page]
    Home -->|Navigation| Category
    Category -->|Filters| Category
    Category -->|Select Product| Product[Product Page]

    %% Product Interaction
    Product -->|CTA: View in Room| AI_Flow[View in Room AI Flow]
    Product -->|CTA: Add to Cart| Cart[Shopping Cart]

    %% AI Visualization Flow
    subgraph AI_Visualization ["5. VIEW IN ROOM (AI CORE FLOW)"]
        direction TB
        Upload[Upload Room Image] --> AI_Fetch[Fetch Rug PNG & Metadata]
        AI_Fetch --> AI_Process[AI Processing Node]
        AI_Process --> AI_Render[Display Rendered Image]
        AI_Render --> AI_Edit[UI Controls: Move/Rotate/Scale]
    end

    AI_Edit -->|Add to Cart| Cart
    AI_Edit -->|Save Preview| Download[Save to Profile/Download]

    %% Conversion
    Cart --> Checkout[Checkout Process]
    Checkout -->|Address & Payment| OrderConfirm[Order Confirmation]

    %% Internal
    subgraph Admin ["8. ADMIN DASHBOARD"]
        direction LR
        AdminProducts[Manage Products/Assets]
        AdminOrders[View Orders]
        AdminAI[AI Usage Analytics]
    end
```

---

## 2. AI Processing Pipeline (Isolated Service)

The AI logic is treated as a specialized service. It receives raw inputs and returns a processed visualization.

```mermaid
sequenceDiagram
    participant FE as Frontend (Next.js)
    participant BE as Backend API Gateway
    participant S3 as Cloud Storage
    participant AI as AI Processing Service

    FE->>BE: POST /api/v1/visualize (Room Image + Rug ID)
    BE->>S3: Upload User Room Image
    BE->>S3: Retrieve Transparent Rug PNG
    BE->>AI: Trigger Processing (Room URL, Rug URL, Dimensions)

    Note over AI: 1. Detect Floor Plane (SLAM/Depth)
    Note over AI: 2. Align Perspective (Homography)
    Note over AI: 3. Scale Rug (Real-world metrics)
    Note over AI: 4. Blend Lighting & Shadows

    AI->>S3: Store Rendered Result
    AI-->>BE: Return Rendered Image URL
    BE-->>FE: Response { status: 200, result_url: "..." }
    FE->>FE: Initialize UI Overlay for interactive adjustments
```

---

## 3. Workflow Node Definitions

### 1. User Entry & Home Page
- **Inputs**: URL Access (Desktop/Mobile).
- **Navigation**: Hero section with deep-link to "View in Room" demo or top collections.
- **Logic**: Device detection to optimize image loading.

### 2. Category & Product Pages
- **Filters**: State-managed filtering by size, color, material, and price.
- **Data Handoff**: Product Page receives `product_id` and fetches high-res gallery and transparent PNG assets.

### 3. View in Room (The AI Core)
- **User Input**: Uploaded `.jpg/.png` of a room.
- **AI Processing**:
    - **Floor Detection**: Identifies the surface area where the rug should be placed.
    - **Perspective Mapping**: Warps the 2D rug PNG to match the 3D room coordinates.
    - **Occlusion Handling**: (Advanced) Detects furniture legs or objects to place the rug *under* them if necessary.
    - **Shadow Synthesis**: Generates realistic drop shadows based on detected room lighting.
- **Interactive UI**: After initial render, user can drag (translate), rotate, and scale.

### 4. Cart & Checkout
- **Data Combination**: The cart item includes standard product metadata plus a reference to the `ai_generated_preview_url` for a personalized touch.
- **Output**: Order confirmation with the "View in Room" preview saved in the user's order history.

### 5. Admin Dashboard
- **Product Ingestion**: Admin uploads:
    - Standard gallery images.
    - **Alpha-masked Transparent PNG** (Crucial for AI overlay).
    - Physical dimensions (e.g., 8' x 10') for accurate scaling.
- **Analytics**: Monitoring AI service latency and conversion rates from "View in Room" users vs. standard users.

---

## 4. System Architecture Constraints

- **Decoupling**: The Frontend communicates with the Backend via REST. The Backend handles the heavy lifting of communicating with the AI Service asynchronously (or via synchronous high-performance endpoints).
- **Scalability**: AI nodes can be scaled independently based on GPU demand.
- **Storage**: All images (User uploads, Rug assets, Final renders) are stored in Cloud Storage (e.g., AWS S3, Google Cloud Storage) with CDN delivery.
