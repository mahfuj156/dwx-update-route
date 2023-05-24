import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & input {
    width: 100%;
    font-size: var(--sm);
    color: var(--dark);
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    height: 30px;
    padding: 0px 10px;
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

  & label {
    margin-bottom: 0;
    font-size: inherit;
    color: #111;
    font-weight: 600;
  }
`;

const TextBox = ({ type, placeholder, labelText, name, value, onChange }) => {
  return (
    <InputWrapper>
      <div className="row form-group">
        <div className="col-md-3">
          {labelText && (
            <label className="form-control-label">{labelText}</label>
          )}
        </div>
        <div className=" col-md-9">
          <input
            type={type ? type : "text"}
            placeholder={placeholder}
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

export default TextBox;
