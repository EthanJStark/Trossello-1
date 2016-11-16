import express from 'express'
import {queries, commands} from '../database'
const router = new express.Router()

// UPDATE
router.post('/:listId', (request, response, next) => {
  commands.updateList(request.params.listId, request.body)
    .then(list => {
      if (list){
        response.json(list)
      }else{
        response.status(404).json(null)
      }
    })
    .catch(next)
})

// ARCHIVE
router.post('/:listId/archive', (request, response, next) => {
  commands.archiveList(request.params.listId)
    .then(() => {
      response.json(null)
    })
    .catch(next)
})

//MOVE
router.post('/:listId/move', (request, response, next) => {
  let { boardId, order } = request.body
  let { listId } = request.params
  boardId = Number(boardId)
  listId  = Number(listId)
  order   = Number(order)
  commands.moveList({ boardId, listId, order })
    .then(() => {
      response.json(null)
    })
    .catch(next)
})

// ARCHIVE ALL CARDS IN A LIST
router.post('/:listId/archivecards', (request, response, next) => {
  commands.archiveCardsInList(request.params.listId)
    .then(() => {
      response.json(null)
    })
    .catch(next)
})

//MOVE ALL CARDS
router.post('/:listId/cards/move', (request, response, next) => {
  const { cardIds, newList, orderOffset } = request.body

  commands.moveAllCards(cardIds, newList, orderOffset)
    .then(() => {
      response.json(null)
    })
    .catch(error => console.error(error))
})

export default router
