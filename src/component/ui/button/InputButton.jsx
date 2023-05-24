import styled from "styled-components";

const InputWrapper = styled.div`
  display: block;
  flex-direction: column;
  gap: 5px;
  & input {
    font-size: var(--sm);
    color: var(--secondaryColor);
    background-color: rgb(51 122 183);
    border: rgb(51 122 183);
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
    height: 30px;
    padding: 0px 40px;
    cursor: pointer;
    display: inline-block;
    width: auto;
    @media (min-width: 768px) {
      height: 36px;
    }

    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    &::placeholder {
      font-size: var(--sm);
      font-weight: var(--regular);
      color: rgba(30, 39, 46, 0.5);
    }
  }
`;

const InputButton = ({ type, labelText, name, value, onChange }) => {
  return (
    <InputWrapper>
      <div className="row form-group">
        <div className="col-md-12">
          <input
            type={type ? type : "Submit"}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </InputWrapper>
  );
};

export default InputButton;
