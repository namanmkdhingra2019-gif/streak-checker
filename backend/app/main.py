from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image, ImageDraw
import io
import uuid
import os

app = FastAPI(title="CarpetViz AI API")

# Setup for local storage of renders (mocking cloud storage)
RENDER_DIR = "static/renders"
os.makedirs(RENDER_DIR, exist_ok=True)

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to CarpetViz AI API"}

@app.post("/api/v1/visualize")
async def visualize(
    room_image: UploadFile = File(...),
    rug_id: str = Form(...),
    width: float = Form(8.0),
    height: float = Form(10.0)
):
    # 1. READ INPUTS
    room_content = await room_image.read()
    room_img = Image.open(io.BytesIO(room_content)).convert("RGBA")

    # 2. AI LOGIC (MOCK)
    # In a real app, this would use a CV model to find the floor plane.
    # Here, we'll just draw a translucent rectangle to represent the rug placement.

    # Create a canvas the same size as the room
    canvas = Image.new("RGBA", room_img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    # Define a quadrilateral for the rug (mock perspective)
    w, h = room_img.size
    # Placing rug roughly in the center-bottom
    quad = [
        (w * 0.3, h * 0.7), # Top-left
        (w * 0.7, h * 0.7), # Top-right
        (w * 0.9, h * 0.9), # Bottom-right
        (w * 0.1, h * 0.9)  # Bottom-left
    ]

    # Draw a mock rug (blueish with some opacity)
    draw.polygon(quad, fill=(50, 100, 200, 150))

    # Composite
    combined = Image.alpha_composite(room_img, canvas)

    # 3. SAVE RESULT
    filename = f"{uuid.uuid4()}.png"
    filepath = os.path.join(RENDER_DIR, filename)
    combined.save(filepath)

    # 4. RETURN URL
    return {
        "status": "success",
        "result_url": f"/static/renders/{filename}",
        "metadata": {
            "rug_id": rug_id,
            "dimensions": {"width": width, "height": height},
            "floor_detected": True,
            "confidence": 0.98
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
