import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOperations";

const initialState = {
  contacts: [],
  loading: false,
  hasMore: true,
};
export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: {
    [fetchContacts.pending](state) {
      state.loading = true;
    },
    [fetchContacts.fulfilled](state, { payload }) {
      state.loading = false;
      const oldContacts = JSON.parse(JSON.stringify(state.contacts));
      const newContacts = payload.filter(
        (item) =>
          !oldContacts.some((itemToBeRemoved) => itemToBeRemoved.id === item.id)
      );
      state.contacts = [...state.contacts, ...newContacts];
      if (newContacts.length === 0 || newContacts.length < 5) {
        state.hasMore = false;
      }
    },
    [fetchContacts.rejected](state) {
      state.loading = false;
    },
    [addContact.pending](state) {
      state.loading = true;
    },
    [addContact.fulfilled](state, { payload }) {
      state.contacts = [...state.contacts, payload];
      state.loading = false;
    },
    [addContact.rejected](state) {
      state.loading = false;
    },
    [deleteContact.pending](state) {
      state.loading = true;
    },
    [deleteContact.fulfilled](state, { payload }) {
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
      state.loading = false;
    },
    [deleteContact.rejected](state) {
      state.loading = false;
    },
  },
});

export default contactsSlice.reducer;
