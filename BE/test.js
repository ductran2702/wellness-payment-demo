async function A(i) {
  console.log(2)
  if (i === 2) {
    throw new Error()
  }
  await new Promise((a, b) => setTimeout(a, 3000))
  return 2
}
async function B() {
  const c = [1, 2, 3, 4]
  try {
    const b = await Promise.all(
      c.map((item, index) => {
        return A(index)
      }),
    )
  } catch (error) {
    console.log('eeee')
  } finally {
    console.log('eeee3213213')
  }
}
B()
console.log(3333)
