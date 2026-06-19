import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config = {
  testEnvironment: 'node', // pure function, no browser needed
}

export default createJestConfig(config)