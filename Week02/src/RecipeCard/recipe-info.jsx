import {RECIPE_DATA} from './recipe-data.js'
import styles from './RecipeCard.module.css'


const RecipeInfo = () => {
    return (
        <div className={styles.recipe_info}>
            <h1 className={styles.recipe_title}>{RECIPE_DATA.title}</h1>
            <h2>Total Time: {RECIPE_DATA.totalTime}</h2>
            <p>{RECIPE_DATA.description}</p>
        </div>
    )
}

export default RecipeInfo