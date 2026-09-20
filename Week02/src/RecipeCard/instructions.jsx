import {RECIPE_DATA} from './recipe-data.js'
import styles from './RecipeCard.module.css'


//.map
const RecipeInstructions = (props) => {
    const { instructions } = props;
    return (
        <div className={styles.instructions_list}>
            <h3 className={styles.list_title}>Instructions:</h3>
            <ul>
                {instructions.map((instruction, index) => {
                    return <li key={index} className={styles.list_item}>{instruction}</li>;
                })}
            </ul>
        </div>
    )
}

export default RecipeInstructions