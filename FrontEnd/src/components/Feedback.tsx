import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Feedback = ({ feedback, setter }: { feedback: [string, string] | null, setter: React.Dispatch<React.SetStateAction<[string, string] | null>> }) => {
    return (
        <div className={`max-w-240 mb-4 rounded-md text-center mx-auto p-4 flex justify-between items-center ${feedback == null ? "hidden" : ""} ${feedback != null && feedback[0] == "Success" ? "bg-green-300/50 text-green-600" : "bg-red-500/50 text-red-300"}`}>
            <p>{feedback != null ? feedback[1] : ""}</p>
            <FontAwesomeIcon onClick={() => setter(null)} className="cursor-pointer" icon={faClose}/>
        </div>
    );
}
 
export default Feedback;