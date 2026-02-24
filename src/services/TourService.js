import api from './api'; // Usa a configuração centralizada (BaseURL, Headers, etc)

const TourService = {
  getTours: async () => {
    const response = await api.get('/admin/tours');
    return response.data;
  },

  getTourById: async (id) => {
    const response = await api.get(`/admin/tours/${id}`);
    return response.data;
  },

  createTour: async (tourData) => {
    const response = await api.post('/admin/tours', tourData);
    return response.data;
  },

  updateTour: async (id, tourData) => {
    const response = await api.put(`/admin/tours/${id}`, tourData);
    return response.data;
  },

  deleteTour: async (id) => {
    await api.delete(`/admin/tours/${id}`);
  },
};

export default TourService;