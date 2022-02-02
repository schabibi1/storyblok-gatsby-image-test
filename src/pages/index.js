import * as React from "react"

import { graphql } from 'gatsby'
import { sbEditable } from '@storyblok/storyblok-editable'
// import DynamicComponent from "../components/dynamicComponent"
import useStoryblok from "../lib/storyblok"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data, location }) => {
  let story = data.storyblokEntry
  story = useStoryblok(story, location)

  // const components = story.content.body.map(blok => {
  //   return (<DynamicComponent blok={blok} key={blok._uid} />)
  // })

  const image = getImage(data.image2)
  const image3 = getImage(data.image3)

  return (
    <Layout>
      <div {...sbEditable(story.content)}>
        <Seo title="Home" />
        <h1>{story.name}</h1>
        <GatsbyImage image={image} alt="" />
        <GatsbyImage image={image3} alt="" />
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
    },
    image2: file(name: {eq: "image-2"}) {
      name
      absolutePath
      childImageSharp {
        gatsbyImageData(
          width: 400
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    },
    image3: file(name: {eq: "image-3"}) {
      name
      absolutePath
      childImageSharp {
        gatsbyImageData(
          width: 400
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`