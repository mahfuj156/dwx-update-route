export default function Container({ panel, children }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading print-none">
              <h2 className="panel-title">{panel}</h2>
            </div>
            <div className="panel-body card-block">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
