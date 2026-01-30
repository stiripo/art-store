import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://localhost:8080/collection', () => {
        return HttpResponse.json([
            {
                id: 2,
                title: "Northern Lights",
                medium: "digital",
                image_url: "http://localhost:8080/images/Northern_Lights.jpg",
                price: 0.00,
                status: "In stock"
            },
            {
                id: 3,
                title: "Actress",
                medium: "digital",
                image_url: "http://localhost:8080/images/Actress.jpg",
                price: 0.00,
                status: "In stock"
            }
        ])
    }),
    http.get('http://localhost:8080/collection/2', () => {
        return HttpResponse.json(
            {
                id: 2,
                title: "Northern Lights",
                medium: "digital",
                image_url: "http://localhost:8080/images/Northern_Lights.jpg",
                price: 0.00,
                status: "In stock"
            })
    })
]