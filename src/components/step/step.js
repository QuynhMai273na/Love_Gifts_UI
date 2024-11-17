const Step = ({ icon, text, describe }) => {
    return (
      <div className="step">
        <img src={icon} alt={text} />
        <p>{text}</p>
        <span>{describe}</span>
      </div>
    );
}
export default Step;