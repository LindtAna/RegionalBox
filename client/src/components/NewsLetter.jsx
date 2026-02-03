import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const NewsLetter = () => {
    const { axios } = useAppContext()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("E-Mail-Adresse erforderlich");
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post("/api/newsletter/add", { email });
            if (data.success) {
                toast.success(data.message);
                setEmail("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Ein Fehler ist aufgetreten");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center
        space-y-2 mt-20 pb-16">
            <h1 className="md:text-4xl text-2xl font-semibold">Verpasse kein Angebot!</h1>
            <p className="md:text-lg text-dark-green/70 pb-10">
                Abonniere unseren Newsletter, um die neuesten Angebote, Neuheiten und exklusive Rabatte zu erhalten.
            </p>
            <div className="max-w-xl mx-auto">
            <form 
            onSubmit={handleSubmit}
            className="flex items-center justify-between 
            md:max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-primary-dull/20 rounded-full h-full border-r-0 
                    outline-none w-full rounded-r-none px-3 text-black placeholder:text-primary md:placeholder:pl-5"
                    type="email"
                    placeholder="E-Mail-Adresse eingeben"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <button type="submit"
                className="md:px-12 px-2 h-full text-white bg-primary
                 hover:bg-dark-green transition-all cursor-pointer rounded-full rounded-l-none"
                 disabled={loading}
                 >
                    {loading ? "Wird abonniert..." : "Abonnieren"}
                </button>
            </form>
             <p className="w-full text-justify text-xs md:text-sm text-black/60 pt-5">
                Mit Klick auf "Abonnieren" willige ich bis auf Widerruf ein, personalisierte Newsletter der RegionalBox zu erhalten. Ich bin damit einverstanden, dass die RegionalBox mir per E-Mail an mich gerichtete Werbung zu Produkten, Dienstleistungen, Aktionen, Zufriedenheitsbefragungen zusendet. RegionalBox darf zur Werbeoptimierung die Öffnung der E-Mails und Klicks auf Links erheben und analysieren. Zu diesen genannten Zwecken verarbeitet RegionalBox meine personenbezogenen Daten, wie in den Datenschutzhinweisen beschrieben. Diese Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen, z.B. per Abmeldelink am Ende eines jeden Newsletters.
            </p>
            </div>
        </div>
    )
}
export default NewsLetter