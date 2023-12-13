import Header from '~/components/header';
import IngredientsInput from '~/components/ingredients-input';
import Recipe from '~/components/recipe';

export default function Home() {
  return (
    <main className="px-6 max-w-[768px] mx-auto flex flex-col justify-between pb-4">
      <div>
        <Header />
        <div>
          <h1 className="text-lg font-bold">Find Recipes Based on Your Ingredients</h1>
          <p className="text-muted-foreground text-sm">
            Enter the ingredients you have, and we&apos;ll suggest a recipe for you!
          </p>
          <IngredientsInput />
        </div>
        <Recipe />
      </div>
    </main>
  );
}
