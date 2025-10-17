import { footerLinks } from "../assets/collections/footerLinks";
import { assets } from '../assets/assets'
const Footer = () => {
 

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-20 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-primary-dull/20 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src={assets.logo} alt="Regional Box Logo" />
                    <p className="max-w-[410px] mt-6 text-dark-green">Wir liefern frische Lebensmittel und Snacks direkt zu Ihnen nach Hause. <br/> Von Tausenden vertraut, ist es unser Ziel, Ihren Einkauf einfach und erschwinglich zu machen.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1 text-dark-green">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-primary-dull/50">
                Copyright {new Date().getFullYear()} © <a href="https://github.com/LindtAna">LindtAna.dev</a> All Right Reserved.
            </p>
        </div>
    );
};

export default Footer