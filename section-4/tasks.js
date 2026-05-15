const express = require('express')
const router = express.Router()
const db = require('../db')

// PATCH /api/tasks/:id/status
router.patch('/api/tasks/:id/status', async (req, res) => {
  const taskId = req.params.id

  const { newStatus, userId, userRole } = req.body

  try {
    // Validate input
    if (!newStatus || !userId || !userRole) {
      return res.status(400).json({
        message: 'Missing required fields'
      })
    }

    // Allow only valid statuses
    const allowedStatuses = ['To Do', 'Done']

    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({
        message: 'Invalid status value'
      })
    }

    // Use parameterized query to prevent SQL Injection
    const result = await db.query(
      'SELECT * FROM tasks WHERE id = $1',
      [taskId]
    )

    const task = result.rows[0]

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      })
    }

    // Authorization check
    const isAdmin = userRole === 'admin'

    const isOwner =
      Number(task.assigned_to) === Number(userId)

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: 'No permission to edit this task'
      })
    }

    // Update task status safely
    await db.query(
      'UPDATE tasks SET status = $1 WHERE id = $2',
      [newStatus, taskId]
    )

    return res.status(200).json({
      message: 'Status updated successfully',
      task: {
        ...task,
        status: newStatus
      },
      updatedBy: {
        id: userId,
        role: userRole
      }
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router