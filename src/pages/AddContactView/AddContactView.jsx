import { Outlet } from "react-router-dom";
import ContactsForm from "../../components/ContactForm/ContactForm";

export default function AddContactView() {
  return (
    <>
      <ContactsForm></ContactsForm>
      <Outlet></Outlet>
    </>
  );
}
