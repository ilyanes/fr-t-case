import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import styles from "./Form.module.css";
import {
  addContact,
  fetchContacts,
} from "../../redux/contacts/contactsOperations";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form({ items, setIsShow, handleClick }) {
  const [userInfo, setUserInfo] = useState({});

  const dispatch = useDispatch();

  // const contactEmail = useSelector((state) =>
  //   state.contacts.contacts.some((contact) => contact.email === userInfo.email)
  // );

  const contactEmail = items.some(
    (contact) => contact.email === userInfo.email
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactEmail) {
      toast.warn(`${userInfo.email} is already in the contact`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
    } else {
      dispatch(addContact(userInfo));
      reset();
      setIsShow((isShow) => !isShow);
    }
  };

  const reset = () => {
    setUserInfo({});
  };

  const handleChange = (e) => {
    if (!e.target.value) {
      return;
    } else {
      setUserInfo((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const formInputId = nanoid();

  return (
    <>
      <ToastContainer />
      <form className={styles.addForm} onSubmit={handleSubmit}>
        <label className={styles.addLabel}>
          Name
          <input
            className={styles.addInput}
            type="text"
            name="name"
            placeholder="John Bill"
            value={userInfo.name}
            onChange={handleChange}
            minLength="3"
            required
            id={formInputId}
          />
        </label>
        <label className={styles.addLabel}>
          Age
          <input
            className={styles.addInput}
            type="number"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
            minLength="2"
            required
            id={formInputId}
            placeholder="18"
          />
        </label>
        <label className={styles.addLabel}>
          Email
          <input
            className={styles.addInput}
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
            id={formInputId}
            placeholder="qwerty18@gmail.com"
          />
        </label>
        <label className={styles.addLabel}>
          TechSkills
          <input
            className={styles.addInput}
            type="text"
            name="techSkills"
            value={userInfo.techSkills}
            onChange={handleChange}
            minLength="3"
            required
            id={formInputId}
            placeholder="Java"
          />
        </label>
        <label className={styles.addLabel}>
          Salary
          <input
            className={styles.addInput}
            type="text"
            name="salary"
            value={userInfo.salary}
            onChange={handleChange}
            required
            id={formInputId}
            placeholder="1000"
          />
        </label>
        <button className={styles.formButtonAdd} type="submit">
          Add worker
        </button>
        <button
          className={styles.formButtonAdd}
          type="button"
          onClick={handleClick}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
