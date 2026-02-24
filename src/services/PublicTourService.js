import api from './Api';

const PublicTourService = {

  getTours: async () => {
    const response = await api.get('/public/tours');
    return response.data;
  },

  getTourById: async (id) => {
    const response = await api.get(`/public/tours/${id}`);
    return response.data;
  },


  getBySlug: async (slug) => {

    const response = await api.get(`/public/tours/slug/${slug}`);
    return response.data;

  }
};

export default PublicTourService;