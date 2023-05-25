import Navbar from "./components/Navbar.js";
import UmbrellaLogo from "./assets/Umbrella-Color.svg";
import BlossomLogo from "./assets/Blossom-Color.svg";
import PinpointLogo from "./assets/Pinpoint-Color.svg";
import VertigoLogo from "./assets/Vertigo-Color.svg";
import PronatureLogo from "./assets/ProNature-Color.svg";


function LandingPage() {

    return (
        <div>
            <Navbar />
            <div className="mt-24 ml-16">
                <h1 className="text-5xl font-bold"> Supercharge Your <span className="underline decoration-blue-400">Memory</span></h1>
                <p className="w-1/2 mt-4 text-2xl">Master subjects effortlessly with our powerful flashcard app. Study smarter, remember more, and achieve your goals.</p>
                <button className="text-white mt-6 font-bold py-3 px-5 rounded-full bg-blue-700">Get Started</button>
            </div>
            <h2 className="mt-24 font-semibold tracking-wider text-black text-center">TRUSTED BY COMPANIES ALL OVER THE WORLD</h2>
            <div className="flex justify-center items-center w-full gap-6 mt-6">
                <img className="w-48" src={UmbrellaLogo}></img>
                <img className="w-48" src={BlossomLogo}></img>
                <img className="w-48" src={VertigoLogo}></img>
                <img className="w-48" src={PinpointLogo}></img>
                <img className="w-48" src={PronatureLogo}></img>
            </div>
        </div>
    );
}

export default LandingPage;