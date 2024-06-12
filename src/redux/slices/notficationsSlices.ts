// slices/notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  message: string;
  data:any;
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [] as Notification[],
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
    },
  },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
