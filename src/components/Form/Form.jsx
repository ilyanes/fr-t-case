import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import styles from "./Form.module.css";
import { addContact } from "../../redux/contacts/contactsOperations";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form({ setIsShow, handleClick }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [techSkills, setTechSkills] = useState("");
  const [salary, setSalary] = useState("");

  const dispatch = useDispatch();

  const contactEmail = useSelector((state) =>
    state.contacts.contacts.some((contact) => contact.email === email)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactEmail) {
      toast.warn(`${email} is already in the contact`, {
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
      dispatch(addContact({ name, age, email, techSkills, salary }));
      reset();
      setIsShow((isShow) => !isShow);
    }
  };

  const reset = () => {
    setName("");
    setAge("");
    setEmail("");
    setTechSkills("");
    setSalary("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "techSkills":
        setTechSkills(value);
        break;
      case "salary":
        setSalary(value);
        break;
      default:
        break;
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
            type="text"
            name="name"
            placeholder="John Bill"
            value={name}
            onChange={handleChange}
            minLength="3"
            required
            id={formInputId}
          />
        </label>
        <label className={styles.addLabel}>
          Age
          <input
            type="number"
            name="age"
            value={age}
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
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            id={formInputId}
            placeholder="qwerty18@gmail.com"
          />
        </label>
        <label className={styles.addLabel}>
          TechSkills
          <input
            type="text"
            name="techSkills"
            value={techSkills}
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
            type="text"
            name="salary"
            value={salary}
            onChange={handleChange}
            required
            id={formInputId}
            placeholder="1000"
          />
        </label>
        <button type="submit">Add worker</button>
        <button type="button" onClick={handleClick}>
          Cancel
        </button>
      </form>
    </>
  );
}
