import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1,
  };
}

export default function Recipes({ recipes }) {
  console.log(recipes);
  return (
    <div className="recipe-list">
      <h1 className="whatsapp">
        <Link
          /* href={`https://api.whatsapp.com/send?phone=4917648737898&text=Quiero hacer una donación..`} */
          href={`https://web.whatsapp.com/send?phone=4917648737898&text=Hola tengo una consulta Miguel, aparezco en mobil`}
        >
          <SiWhatsapp />
        </Link>
      </h1>

      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>
        {`
          .recipe-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px 60px;
          }
          .whatsapp {
            color: green;
            font-size: 50px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
