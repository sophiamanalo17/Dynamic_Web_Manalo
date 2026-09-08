import {RECIPE_DATA} from './recipe-data.js'

const RecipeInfo = () => {
    return (
        <>
            <h1>{RECIPE_DATA.title}</h1>
            <h2>Total Time: {RECIPE_DATA.totalTime}</h2>
            <p>{RECIPE_DATA.description}</p>
        </>
    )
}

export default RecipeInfo