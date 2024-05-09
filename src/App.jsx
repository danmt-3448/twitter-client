import { RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import router from './router'
import { useEffect } from 'react'
import axios from 'axios'
function App() {
  useEffect(() => {
    const controller = new AbortController();
    for (let i = 0; i < 1; i++) {
      axios
        .get('/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          baseURL: import.meta.env.VITE_API_URL,
          signal: controller.signal
        })
        .then((res) => {
          localStorage.setItem('profile', JSON.stringify(res.data.result));
          controller.abort(); // Hủy sau khi xử lý phản hồi thành công
        })
        .catch((err) => {
          if (err.code === 'ECONNABORTED') {
            // Xử lý lỗi hủy (tùy chọn)
          } else {
            // Xử lý các lỗi khác
          }
          controller.abort(); // Hủy khi có lỗi
        });
    }

    return () => controller.abort(); // Dọn dẹp cho các yêu cầu tiềm ẩn còn lại
  }, []);
  return <RouterProvider router={router} />
}

export default App
