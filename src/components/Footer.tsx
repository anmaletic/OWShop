const Footer = () => {
  return (
    <>
      <div className="footerStyle p-2 " data-bs-theme="dark">
        <div className="container-xxl">
          <div className="row row-cols-1 row-cols-md-3 text-center align-items-center">
            <div className="col">
              <div className="col-12">
                <span className="me-1">Built By</span>
              </div>
              <div className="col-12">
                <span className="me-1">Antonio Maletić</span>
              </div>
            </div>
            <div className="col">
              Powered by <a href="https://fakestoreapi.com/">FakeStoreAPI</a>
            </div>
            <div className="col">
              <div className="col-12">
                <a href="https://github.com/anmaletic/OWShop">
                  <i className="bi bi-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
