import App, { Container } from 'next/app'
import React from 'react'
import Header from '../components/Header'

export default class MyApp extends App {
  render() {
    const { Component } = this.props
    return (
      <Container>
        <Header />
        <Component />
      </Container>
    )
  }
}
