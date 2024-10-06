interface FlashcardListPageProps {
  flashcards: { id: string; question: string; answer: string }[];
}

function FlashcardListPage({ flashcards }: FlashcardListPageProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Flashcard List</h1>
        <p className="text-muted-foreground">
          Review all your created flashcards.
        </p>
      </div>
      {flashcards.length === 0 ? (
        <p className="text-center text-muted-foreground">No flashcards yet. Add some to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((flashcard) => (
            <div key={flashcard.id} className="bg-card text-card-foreground rounded-lg shadow-sm border">
              <div className="p-6 space-y-2">
                <h3 className="font-semibold">Question: {flashcard.question}</h3>
                <p className="text-sm text-muted-foreground">Answer: {flashcard.answer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlashcardListPage;