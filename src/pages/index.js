import * as React from "react"

import { graphql } from 'gatsby'
import { sbEditable } from '@storyblok/storyblok-editable'
import DynamicComponent from "../components/dynamicComponent"
import useStoryblok from "../lib/storyblok"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data, location }) => {
  let story = data.storyblokEntry
  story = useStoryblok(story, location)

  const components = story.content.body.map(blok => {
    return (<DynamicComponent blok={blok} key={blok._uid} />)
  })

  const image = getImage(data.image2)

  return (
    <Layout>
      <div {...sbEditable(story.content)}>
        <Seo title="Home" />
        <h1>{ story.name }</h1>
        <GatsbyImage image={image} alt="" />
        { components }
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    storyblokEntry(full_slug: {eq: "home"}) {
      content
      name
      internalId
    }
    image2: file(name: {eq: "image-2"}) {
      name
      absolutePath
      childImageSharp {
        gatsbyImageData(
          width: 300
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`