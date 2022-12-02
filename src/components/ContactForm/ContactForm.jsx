import { useState } from "react";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import styles from "./ContactForm.module.css";

export default function ContactsForm({ items }) {
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => {
    setIsShow((isShow) => !isShow);
  };
  return (
    <div className={styles.contactFormDiv}>
      <button className={styles.formButton} type="button" onClick={handleClick}>
        Add contact
      </button>
      {isShow && (
        <Modal handleClick={handleClick}>
          <Form
            handleClick={handleClick}
            items={items}
            setIsShow={setIsShow}
          ></Form>
        </Modal>
      )}
    </div>
  );
}
