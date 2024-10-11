import styles from "./EmployeeCard.module.scss";

const Employee = () => {
  return (
    <div className={styles.employee}>
      <img
        src="/images/Mock-emloyee.png"
        alt="Employee"
        width={261}
        height={248}
      />
      <p className={styles.employee__name}>Алексей Сергеевич</p>
      <p className={styles.employee__category}>категория педагога</p>
      <p className={styles.employee__experience}>опыт работы: 5 лет</p>
    </div>
  );
};

export default Employee;
