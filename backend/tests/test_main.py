from fastapi.testclient import TestClient
from app.main import app
import io
from PIL import Image

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to CarpetViz AI API"}

def test_visualize_endpoint():
    # Create a dummy image
    img = Image.new('RGB', (100, 100), color = 'red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()

    response = client.post(
        "/api/v1/visualize",
        files={"room_image": ("test.png", img_byte_arr, "image/png")},
        data={"rug_id": "test-rug", "width": "8.0", "height": "10.0"}
    )

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "result_url" in data
    assert data["metadata"]["rug_id"] == "test-rug"
