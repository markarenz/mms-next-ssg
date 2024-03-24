---
title: Hybrid Route Mapping with React and MapBox
datePublished: 2021-08-25
image: posts/42.jpeg
metaDescription: My side projects tend toward the whimsical, but this is something I'd actually use, a route mapping app for people to plan and share their outdoor experiences.
---

My days are filled with practical, serious-minded code. I genuinely love it. But when the sun sinks low on the horizon, and personal projects come to mind, my interests tend toward the whimsical. I build social media networks where you can only post colors, space survival shooters where your only weapon is a ping-pong canon, apps for creating magnetic poetry out of classic literature- and those are just projects I decided to make public.

Compared with that nonsense, my new side project might run the risk of being actually useful: a web application for outdoorsy people to plan, track, and share their camping, paddling, hiking, and biking experiences. Obviously, there are existing sites that do some of these things already, but I think there could be value in attempting to improve on them. My primary quibble with these sites is that they present their information as authoritative even though much of the data is misleading or flat out wrong. (Look at the "official" trails at Indy's Fort Benjamin Harrison State Park in AllTrails if you want to see what I mean.) With this project, I want to make something that moves away from the authoritative approach and toward the personal. Let's give users a means of sharing their experiences and give other users a way to learn from that experience. Find a route someone else hiked, go hike it and log your experience or fork that route and make your own version. Unlock achievements for racking up miles. Trade ideas on the best style of footwear for specific kinds of outings. In other words, use the data to build a community.

![A 10-miler around Geist Reservoir](https://www.markmakesstuff.com/remote/images/upward-trail-10-miler-with-arrows.jpg)

So, unlike most of the things I make, this is something I would actually use. As a matter of fact, I have been using it- or at least the prototype of the route-mapping feature I recently built.

Earlier this year, I hiked the whole of the Monon Trail (from 10th street downtown Indianapolis and end up on 10th street in Sheridan, Indiana). I didn't do it all at once, of course, but over the course of a few weekends. You'd think that route mapping for a trail as straight as the Monon would be unnecessary, but figuring out how to break up the trail and where to park were critical elements in the planning.

Unless you plan to take an Uber back to your car, the trail is an out-and-back hiking experience, so by the time you've done the Monon once, you've actually done it twice. I spent a few hours picking turn-around spots and scouting possible parking options, and when it was all over the only place I could store that information was in a spreadsheet. I'm sure that would have been fine, but it wouldn't be cool. I wanted something cool with maps and markers and such. A route-building or mapping tool would fit the bill, and I could use it to map a route around the Geist Reservoir that wouldn't get me killed. Other folks in the area might even find a route like that useful. Who knows, they might even want to add their own routes.

![Markers for parking and campsites](https://s3.amazonaws.com/www.markmakesstuff.com/remote/images/upwardtrail-alert-marker.jpg)

If this would-be app were a game, you would say the route mapping feature would be it's "core mechanic." With that in mind, I began work on a proof of concept (POC) for this a few weeks ago. I would up creating several distinct versions of the POC using a variety of approaches with both the Google Maps and MapBox APIs. I decided, for now at least, to work with MapBox because their data gives me better access to paths and state park trails. That said, the coding patterns I'm using can be refactored back to Google Maps without too much lift.

Early in the process, I set up a simple React app with Google Maps and an editable polyline element for the route along with specialized markers for parking, campsites, and other points of interest. This worked well enough but was not sufficient. For free drawing routes, this method is fine. However, in the real world, users are going to want an easier, more intuitive way to follow roadways and paths. I found some sites that already do something like this and set to work on reverse engineering the functionality. It soon became clear that we need the ability to toggle between free drawing and "snapping" at will. Each point will need to be smart enough to know what type of point it is and store the route back to the previous point.

![Hybrid Route Mapping](https://s3.amazonaws.com/www.markmakesstuff.com/remote/images/upwardtrail-hybrid-01.jpg)

Clicking a point toggles snapping on and off, and double-clicking a point will remove it. Making a point snapped will also move it onto the nearest path or roadway. To achieve this, I'm calling to the MapBox directions API as each snapped point is created or moved. The resulting payload includes some vital data including point-to-point distance and a polyline6 string under the geometry prop. This geometry string looks like garbage text at first, but in reality it's a highly efficient means of storing map geometry. We can expand this with a helper function and store it as a prop in the path array.

```
const getPathRouteInfo = async (pathToCheck, newPath, index, setPath) => {
  let pathParam = pathToCheck.map((p) => `${p.lng},${p.lat}`).join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${pathParam}?geometries=polyline6&access_token=${process.env.REACT_APP__MAPBOX_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  const distance = data?.routes[0]?.distance; // meters
  if (data.code === "Ok" && data?.routes[0]) {
    const snappedPoint = newPath[index];
    snappedPoint.lng = data.waypoints[1]?.location[0];
    snappedPoint.lat = data.waypoints[1]?.location[1];
    const geometry = data?.routes[0]?.geometry;
    const nextPath = newPath.map((p, idx) =>
      idx !== index ? p : { ...snappedPoint, distance, geometry }
    );
    setPath([...nextPath]);
  }
};
```

We can then draw the polyline under the control point markers during the component render, evaluating each point in the array and drawing back to the previous point.

Some of the routes may be fairly complex, especially when zoomed out. To address this, I added a new function to calculate the angle to the next point, which we call when geometry changes. With the rotation prop added to the point object, we can use transform on a div surrounding the img tag to rotate the icon in the direction of the path.

```
const angleToNext = (idx, newPath) => {
  if (idx >= newPath.length - 1 || idx < 0) {
    return 0;
  }
  const deltaLat = newPath[idx + 1].lat - newPath[idx].lat;
  const deltaLng = newPath[idx + 1].lng - newPath[idx].lng;
  return (Math.atan2(deltaLng, deltaLat) * 180) / Math.PI;
};
```

The POC was working well and the UI felt comfortable and, I don't mind saying, kind of fun. Drawing a complex path-following route took just a few clicks, but I couldn't delete points, toggle a point's snapping status, or move them without creating strange results. This is why I like to treat these POCs as if they're "real" projects. It's a way of forcing myself to address issues that I might otherwise ignore and move on to the next shiny thing.

In an earlier iteration of the POC, I cleared the snapping for surrounding points when deleting, dragging or toggling snapping on a point. This was out of a sense of caution related to the number of API calls, but it didn't feel complete without finding a means of preserving snapping during those events. I spent a fair amount of offline time thinking through how best to approach these user conditions since they seemed to inject a fair amount of complexity into the user flow. Dragging a snapped point proved to be the most complex so I dug into that one first.

![Dragging a snapped point](https://s3.amazonaws.com/www.markmakesstuff.com/remote/images/map-test-drag.gif)

Dragging involves A to B to C, so ideally we would send 3 points to the directions API and pull the route and legs data from the response payload. Unfortunately, Mapbox returns the geometry for the whole route rather than by leg. We could enable steps, generally used for turn-by-turn driving directions, but that generated polylines for every step in the leg rather than the leg as a whole. That wasn't going to work. In the end, I would up calling the directions lookup twice using async await. The first call calls the API for A to B and the second calls the API for B to C. At the time, the directions lookup function updated the path useState. I refactored this to simply return the mutated path array so the function could run setPath or chain it to another call, which we needed to do in this case. Of course, this method results in even more API calls, which is going to be expensive if I ever let other people use this.

![Deleting a snapped point](https://s3.amazonaws.com/www.markmakesstuff.com/remote/images/map-test-delete.gif)

In comparison, deleting a point proved to be much simpler. We remove point B from the array and run an API check for A to C. Of course, if point C is not snapped, we don't need to hit the API at all.

![Toggling snapping](https://s3.amazonaws.com/www.markmakesstuff.com/remote/images/map-test-toggle.gif)

Toggling a point by clicking on it involved only checking the API for A to B (when snapping for that point is toggled on) since the geometry looks backwards from a given point to the previous point.

As mentioned earlier, I had been rotating the route path markers to indicate the direction to the next point. This worked well enough, but for complex snapped routes, the rotated icons didn't give much of a sense of the flow of the route. Instead, I really wanted to ditch the dashed line and use dashed arrows instead. I ripped out the rotation code and instead used the `<Source>` and `<Layer>` components in the react-map-gl library to draw the polyline beneath the draggable path point markers with a line-pattern property.

Doing this turned out not to be too difficult with useEffect and useRef. I'm including mapRef as the ref prop in the `<ReactMapGL />` component. This allows me to grab the map and use the trusty getMap() function to load & add images that can be used as patterns in my `<RouteLine />` component.

```
const mapRef = useRef(null);
useEffect(() => {
  const map = mapRef.current.getMap();
  map.loadImage("/forward.png", (error, image) => {
    if (error) throw error;
    if (!map.hasImage("forward"))
      map.addImage("forward", image, { sdf: true });
  });
  map.loadImage("/bidirectional.png", (error, image) => {
    if (error) throw error;
    if (!map.hasImage("bidirectional"))
      map.addImage("bidirectional", image, { sdf: true });
  });
}, [mapRef]);
```

In the paint prop, I had been using line-dasharray and line-color to define the line we're drawing, but instead I'm using line-pattern and referencing the images we loaded in the useEffect. The display is conditional based on the style of route. If it's an out-and-back route, the arrows are bidirectional.

```
<Source id="polylineLayer" type="geojson" data={polylineGeoJSON}>
  <Layer
    id="lineLayer"
    type="line"
    source="my-data"
    layout=&lbrace;&lbrace;
      "line-join": "round",
      "line-cap": "round",
    &rbrace;&rbrace;
    paint=&lbrace;&lbrace;
      "line-pattern":
        routeStyle === "out-and-back" ? "bidirectional" : "forward",
      "line-width": 10,
    &rbrace;&rbrace;
  />
</Source>
```

I'm quite excited to begin building out the rest of the app once drawings and other pre-vis is complete. I plan to build the API as a scalable Lambda in AWS using SAM. The frontend will just be flat React running off of an S3 for pocket change. The database and the mapping API usage is probably where the real costs are going to bite me. Since I'm not fond of the freemium model most sites like this use, I'm not sure I'll ever find a way to ethically monetize it, and I don't relish the thought of drowning in AWS fees.

The "core mechanic" of the app is fun to use so far, and the challenges the project presents are very interesting. So, I'm very excited to dig in see it through- even if I'm the only user.
