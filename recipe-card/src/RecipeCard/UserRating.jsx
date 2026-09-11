import {useState} from "react";
import {FaHeart} from "react-icons/fa";
import styles from "./RecipeCard.module.css";

const UserRating = () => {
    //useState is hook 1. the current state, 2. the function to update the state.
    const [count, setCount] = useState(0);

    //whenever you have event handeler, define a function to handle the event.
    const handlePlusClick = () => {
        setCount(count + 1);
    }

    const handleMinusClick = () => {
        setCount(count - 1);
    }
    
    return <div className={styles.rating}>
        <span className={styles.rating_btn_slot}>
        {count > 0 &&(
        <button className={styles.rating_btn} onClick={handleMinusClick}>[-]</button> 
        )
        }
        </span>
        
        {[...Array(count)].map((heart, index) => {
            return (
            <span key={index} className={styles.heart}>
                <FaHeart />
            </span>
            )
        })}
        
        <span className={styles.rating_btn_slot}>
        {count < 5 &&(
        <button className={styles.rating_btn} onClick={handlePlusClick}>[+]</button>
        )
        }
        </span>
        </div>
}

export default UserRating;
