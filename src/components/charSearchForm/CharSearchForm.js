import "./charSearchForm.scss"


const CharSearchForm = () => {
    return(
        <div className="charr__search-form">
            <form>
                <label className="char__search-label" htmlFor="">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    {/* <Field/> */}
                    <button className="button button__main">
                        <div className="inner">find</div>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CharSearchForm;