import './style.css'; // Importar el archivo CSS

function LoaderPage() {
  return (
    <>

<div className="spinner">
  <div className="outer">
    <div className="inner tl"></div>
    <div className="inner tr"></div>
    <div className="inner br"></div>
    <div className="inner bl"></div>
  </div>
</div>    </>
  );
}

export default LoaderPage;
