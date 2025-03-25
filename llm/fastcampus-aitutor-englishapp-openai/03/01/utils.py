def levenshtein(a, b):
    "Calculates the Levenshtein distance between a and b."
    n, m = len(a), len(b)
    if n > m:
        # Make sure n <= m, to use O(min(n,m)) space
        a, b = b, a
        n, m = m, n

    current_row = range(n + 1)
    for i in range(1, m + 1):
        previous_row, current_row = current_row, [i] + [0] * n
        for j in range(1, n + 1):
            add, delete, change = (
                previous_row[j] + 1,
                current_row[j - 1] + 1,
                previous_row[j - 1],
            )
            if a[j - 1] != b[i - 1]:
                change += 1
            current_row[j] = min(add, delete, change)

    return current_row[n]


def grade_dictation(correct_script, student_response):
    correct_words = correct_script.split()
    student_words = student_response.split()

    # Compute the Levenshtein distance
    distance = levenshtein(correct_words, student_words)

    # Calculate total words and accuracy
    total_words = max(len(correct_words), len(student_words))
    accuracy = (total_words - distance) / total_words

    return {"levenshtein_distance": distance, "accuracy": accuracy}
