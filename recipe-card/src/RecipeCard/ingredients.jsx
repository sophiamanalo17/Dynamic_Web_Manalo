import {useState} from 'react'
import styles from './RecipeCard.module.css'


// export default RecipeIngredients

// export default function RecipeIngredients(props) {
//   const {ingredients} = props

//   return (
//     <div>
//       <h3 className={styles.list_title}>Ingredients</h3>
//       <ul>
//         {ingredients.map((i, index) => (
//           <li className={styles.list_item}key={index}>
//             <span className={styles.measure}>{i.measure}</span>
//             <span>{i.name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

const RecipeIngredients = (props) => {
    // 1. get BOTH lists from props
    const {metric, imperial} = props

    const [isMetric, setIsMetric] = useState(true);

    //sophie notes: toggle so Metric by default, if clicked , it will switch to Imperial (!isMetric=Imperial). If clicked again, it will switch back to Metric.
    const handleUnitClick = () => {
        setIsMetric(!isMetric);
    }

    //sophie notes: setIsMetric different memoty so this says metric is ingredients if true, but if not show imperial. So if isMetric is true, ingredients = metric, if false, ingredients = imperial. 
    const ingredients = isMetric ? metric : imperial

    return (
        <div>
            <h3 className={styles.list_title}>Ingredients</h3>
            <button className={styles.unit_btn} onClick={handleUnitClick}>
                Switch to {isMetric ? "Imperial" : "Metric"}
            </button>
            <ul>
                {/* sophie note: Ingredients will be whatever was defined through handler */}
                {ingredients.map((i, index) => (
                    <li className={styles.list_item} key={index}>
                        <span className={styles.measure}>{i.measure}</span>
                        <span>{i.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeIngredients