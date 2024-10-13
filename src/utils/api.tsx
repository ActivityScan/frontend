import { AsyncThunkConfig, Club, ValidateValues } from '@/Types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import selectedSports from '../store/sportSlice';

// const { selectedSports } = useAppSelector(state=>state.sports)

//запрос на секции с первого экрана
export const fetchClubs = createAsyncThunk<Club[], ValidateValues>(
    'search/fetchClubs',
    async (data, { rejectWithValue }) => {
      
        // const { selectedSports } = useAppSelector(state=>state.sports)
      try {
        console.log(data);
        const response = await axios.get('/api/clubs/main-filter', {
          params: {
            age: data.age,
            // city: data.address,
            city: 'Saint Petersburg',
            // modeWork: data.modeWork?.join(','),
            // sportNames:  data?.sportNames?.join(','),
            // ...(data.sportNames ? { sportNames: data.sportNames.join(',') } : {}),
            // weekdayTimes: data?.weekdayTimes?.join(',')
            longitude: data.longitude,
            latitude: data.latitude
          }
        }
      );
        console.log(response.data)
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error message:', error.message);
          console.error('Response data:', error.response?.data);
          console.error('Response status:', error.response?.status);
          return rejectWithValue(error.response?.data);
        }
        throw error;
      }
    }
);
  

export const fetchClubInfoById = createAsyncThunk<Club, number, AsyncThunkConfig>(
  'club/fetchClubInfoById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/clubs/${id}`, {
       
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);