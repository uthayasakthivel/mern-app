import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { MdDelete, MdModeEditOutline } from "react-icons/md"
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  // const { user } = useAuthContext()

  const handleDelete = async () => {
    // if (!user) {
    //   return
    // }
    const id = workout._id
    const response = await fetch("/api/workouts/" + id, {
      method: "DELETE",
      // headers: {
      //   'Authorization': `Bearer ${user.token}`
      // }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json })
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleDelete} className="update">
        <MdModeEditOutline />
      </span>
      <span onClick={handleDelete} className="delete">
        <MdDelete />
      </span>
    </div>
  )
}

export default WorkoutDetails
