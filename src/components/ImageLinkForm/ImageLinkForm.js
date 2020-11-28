import './ImageLinkForm.css';

const ImageLinkForm= ({onInputChange,onSubmit}) => {
    return(
        <div className="f3">
            <p>
                {"this magic brain will detect faces on your pictures,try that!"}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input type="text" className="f4 pa2 w-70 center"onChange={onInputChange}/>
                    <button onClick={onSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
        </div>
    )
    }
    export default ImageLinkForm;
