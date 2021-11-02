import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
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
            cursor: pointer;
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #25d366;
            color: #fff;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            box-shadow: 2px 2px 3px #999;
            z-index: 100;
            margin-top: 16px;
          }
          .whatsappweb {
            cursor: pointer;
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 120px;
            background-color: #25d366;
            color: #fff;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            box-shadow: 2px 2px 3px #999;
            z-index: 100;
            margin-top: 16px;
          }
          .icon {
            margin-top: 14px;
          }
        `}
      </style>
    </div>
  );
}
