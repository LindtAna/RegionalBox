const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center
        space-y-2 mt-20 pb-16">
            <h1 className="md:text-4xl text-2xl font-semibold">Verpasse kein Angebot!</h1>
            <p className="md:text-lg text-dark-green/70 pb-10">
                Abonniere unseren Newsletter, um die neuesten Angebote, Neuheiten und exklusive Rabatte zu erhalten.
            </p>
            <form className="flex items-center justify-between 
            md:max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-primary-dull/20 rounded-full h-full border-r-0 
                    outline-none w-full rounded-r-none px-3 text-black placeholder:text-primary md:placeholder:pl-5"
                    type="text"
                    placeholder="E-Mail-Adresse eingeben"
                    required
                />
                <button type="submit" className="md:px-12 px-2 h-full text-white bg-primary hover:bg-dark-green transition-all cursor-pointer rounded-full rounded-l-none">
                    Abonnieren
                </button>
            </form>
        </div>
    )
}
export default NewsLetter