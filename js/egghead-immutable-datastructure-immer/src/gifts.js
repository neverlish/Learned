import produce, { createDraft, finishDraft } from 'immer'
import { allUsers, getCurrentUser } from './misc/users'
import defaultGifts from './misc/gifts'

export const addGift = produce((draft, id, description, image) => {
  draft.gifts.push({
    id,
    description,
    image,
    reservedBy: undefined
  })
})

export const toggleReservation = produce((draft, giftId) => {
  const gift = draft.gifts.find(gift => gift.id === giftId)
  gift.reservedBy =
    gift.reservedBy === undefined
      ? draft.currentUser.id
      : gift.reservedBy === draft.currentUser.id
        ? undefined
        : gift.reservedBy
})

export function getInitialState() {
  return {
    users: allUsers,
    currentUser: getCurrentUser(),
    gifts: defaultGifts
  }
}

export async function getBookDetails(isbn) {
  const response = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`, {
    mode: "cors"
  })

  const book = (await response.json())['ISBN:' + isbn]
  return book
}

export const addBook = produce((draft, book) => {
  draft.gifts.push({
    id: book.identifiers.isbn_10[0],
    description: book.title,
    image: book.cover.medium,
    reservedBy: undefined
  })
})