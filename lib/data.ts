// Initial/default spatial scenario for Greater London Bicycle analysis
export const londonInitialScenario = {
  cityName: "London",
  plan: [
    "Identify critical urban transit sectors and bottleneck corridors across London database regions.",
    "Formulate 8 core geographic centroid locations based on demographic density overlays.",
    "Pose hyper-pointed structural optimization questions for each coordinate node.",
    "Map interactive pins on high-resolution Google Satellite imagery layers for direct expert feedback.",
  ],
  explanation:
    "Our agentic network evaluated raw transit and demographic records directly within London BigQuery partitions. We isolated 8 high-density coordinates and formatted active, AI-generated infrastructure optimization questions to map over the Google Satellite visual basemap layer.",
  sql: "-- NATIVE GEOSOLVIX BIGQUERY DIRECT SPATIAL AGENT QUERY\nSELECT node_id, name, latitude, longitude,\n       ST_GEOGPOINT(longitude, latitude) as point_geom,\n       'AI Question' as analytical_node_type\nFROM `bigquery-public-data.london_infrastructure.geospatial_nodes`\nWHERE region_classification = 'Greater London'\nORDER BY density_score DESC\nLIMIT 8;",
  features: [
    {
      id: "p1",
      name: "AI Question #1",
      category: "Congestion Bottleneck",
      latitude: 51.5007,
      longitude: -0.1246,
      metric: 94,
      notes:
        "How can we optimize commuter bike flow and eliminate queue lines between Westminster and Waterloo?",
    },
    {
      id: "p2",
      name: "AI Question #2",
      category: "Infrastructure Adequacy",
      latitude: 51.5014,
      longitude: -0.1921,
      metric: 78,
      notes:
        "Is the cycle lane capacity in Kensington sufficient to support peak morning checkouts?",
    },
    {
      id: "p3",
      name: "AI Question #3",
      category: "Socio-Economic Demand",
      latitude: 51.5262,
      longitude: -0.0768,
      metric: 88,
      notes:
        "Should we deploy a new central micro-mobility corridor near Shoreditch to support tech commuting?",
    },
    {
      id: "p4",
      name: "AI Question #4",
      category: "Flow Acceleration",
      latitude: 51.5033,
      longitude: -0.1017,
      metric: 85,
      notes:
        "Where are the primary obstruction nodes causing cyclist delays along Southwark River Corridor?",
    },
    {
      id: "p5",
      name: "AI Question #5",
      category: "Catchment Range",
      latitude: 51.4826,
      longitude: -0.0077,
      metric: 52,
      notes:
        "What is the optimal service buffer size for the Greenwich leisure station network?",
    },
    {
      id: "p6",
      name: "AI Question #6",
      category: "Parking Security",
      latitude: 51.5218,
      longitude: -0.1601,
      metric: 91,
      notes:
        "Can we relocate local vehicle parking slots in Marylebone to secure high-volume cycle routes?",
    },
    {
      id: "p7",
      name: "AI Question #7",
      category: "Multimodal Friction",
      latitude: 51.5234,
      longitude: -0.1072,
      metric: 67,
      notes:
        "How do we minimize transit transfer friction at the Clerkenwell Intersect during high rain levels?",
    },
    {
      id: "p8",
      name: "AI Question #8",
      category: "Junction Integration",
      latitude: 51.4862,
      longitude: -0.1229,
      metric: 72,
      notes:
        "Which missing lane segments prevent continuous safe transit from Vauxhall to Westminster?",
    },
  ],
};

// Selection of quick interactive templates
export const sampleTemplates = [
  {
    title: "SF Transit Hub Clashes",
    prompt:
      "Show SF Muni lines intersecting with high population density nodes inside commercial zones.",
    city: "San Francisco",
  },
  {
    title: "NYC Storm Damage Risk",
    prompt:
      "Map NYC coastal properties lying within a 500 meter buffer of historical flood surge contours.",
    city: "New York City",
  },
  {
    title: "Paris Retail Catchments",
    prompt:
      "Locate Paris districts lacking premium grocery stores within a 1.5km walking radius.",
    city: "Paris",
  },
];

export const trainingCourses = [
  {
    id: "GIS-101",
    title: "Level 1: GIS Fundamentals",
    target: "Absolute Beginners, Students, Career Switchers",
    duration: "Self-Paced (8 Modules)",
    level: "Beginner",
    prerequisite: "None",
    icon: "globe",
    description:
      "Master the core foundations of Geographic Information Systems. From coordinate systems to spatial analysis — build the skills that every GIS professional needs.",
    topics: [
      "Introduction to GIS and Its Real-World Applications",
      "Understanding Coordinate Systems and Map Projections",
      "Working with Vector and Raster Data Types",
      "Exploring GIS Data Sources, Formats, and Quality",
      "Managing Attribute Tables and Running Spatial Queries",
      "Performing Basic Spatial Analysis: Buffer, Overlay, and Clip",
      "Designing Clear and Effective Map Layouts",
      "Getting Started with GIS Software Interface and Tools",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Core concepts, projections, coordinate systems, and data types (Vector vs Raster)",
      },
      {
        day: "Module 3-5",
        topic: "Data sourcing, attribute management, and SQL spatial queries",
      },
      {
        day: "Module 6-8",
        topic: "Practical spatial analysis (buffers/overlays), map design principles, and UI familiarization",
      },
    ],
    badge: "Start Here",
  },
  {
    id: "GIS-201",
    title: "Level 2: GIS Data Structure and Design",
    target: "Data Managers, GIS Technicians, Analysts",
    duration: "Self-Paced (5 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-101 (Level 1)",
    icon: "database",
    description:
      "Learn how to properly organize and store spatial data. Move beyond messy shapefiles and master geodatabases, domains, subtypes, and data validation rules.",
    topics: [
      "File Geodatabases vs. Shapefiles",
      "Designing Schemas and Feature Classes",
      "Setting up Domains and Subtypes",
      "Topology Rules and Spatial Validation",
      "Managing Metadata and Documentation",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Transitioning to Geodatabases: Structuring folders, datasets, and feature classes",
      },
      {
        day: "Module 3-4",
        topic: "Enforcing data integrity using Domains (dropdowns) and Subtypes for clean data entry",
      },
      {
        day: "Module 5",
        topic: "Applying basic Topology rules to prevent overlaps, gaps, and drawing errors",
      },
    ],
    badge: "Step 2",
  },
  {
    id: "GIS-301",
    title: "Level 3: Map Design & Visual Communication",
    target: "GIS Technicians, Urban Planners, Researchers",
    duration: "Self-Paced (5 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-201 (Level 2)",
    icon: "pen-tool",
    description:
      "Turn plain data into beautiful, easy-to-understand maps. Learn the rules of cartography, choosing the right colors, and designing layouts for printing or reports.",
    topics: [
      "The Rules of Good Cartography",
      "Choosing Colors for Data (Choropleth Maps)",
      "Labeling and Typography",
      "Adding Legends, Scale Bars, and North Arrows",
      "Exporting High-Quality Maps for Print",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Visual hierarchy, choosing the right symbols, and mapping numerical data correctly",
      },
      {
        day: "Module 3-4",
        topic: "Advanced labeling techniques and setting up a professional map layout page",
      },
      {
        day: "Module 5",
        topic: "Exporting maps in different formats (PDF/PNG) for reports and presentations",
      },
    ],
    badge: "Step 3",
  },
  {
    id: "GIS-401",
    title: "Level 4: Solving Problems with Spatial Analysis",
    target: "Analysts, Researchers, Decision Makers",
    duration: "Self-Paced (6 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-301 (Level 3)",
    icon: "layers",
    description:
      "Start using your maps to make decisions. Learn how to combine layers, find the best locations, and measure distances to answer real-world questions.",
    topics: [
      "Proximity Analysis (Creating Buffers)",
      "Overlay Analysis (Intersect & Union)",
      "Filtering Data by Location",
      "Finding the Closest Facilities",
      "Summarizing Data within Boundaries",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Measuring distances and creating safety zones or catchment areas using Buffers",
      },
      {
        day: "Module 3-4",
        topic: "Combining multiple datasets using Intersect and Union to find overlaps",
      },
      {
        day: "Module 5-6",
        topic: "Summarizing populations within specific areas and exporting the results",
      },
    ],
    badge: "Step 4",
  },
  {
    id: "GIS-501",
    title: "Level 5: Sharing Maps Online",
    target: "GIS Technicians, Planners, Small Business Owners",
    duration: "Self-Paced (4 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-401 (Level 4)",
    icon: "cloud",
    description:
      "Move away from static PDF maps. Learn how to easily upload your data to the cloud and share interactive maps with your team or the public without any coding.",
    topics: [
      "Introduction to Cloud GIS",
      "Uploading and Hosting Shapefiles",
      "Styling Interactive Web Maps",
      "Configuring Map Pop-ups",
      "Sharing Maps via Links or Embedding",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Preparing local data for the web and uploading it to a cloud mapping platform",
      },
      {
        day: "Module 3-4",
        topic: "Setting up interactive pop-ups, styling the web map, and generating a shareable link",
      },
    ],
    badge: "Final Step",
  }
];

export const gisBlogs = [
  {
    id: "blog-scout-01",
    title: "Scout: A Cloud-Native Geospatial Pipeline Powered by DuckDB, GeoParquet & PMTiles",
    excerpt: "How Scout transforms any geospatial URL into production-ready tiles, STAC catalogs, and AI-powered analytics in under 60 seconds — without pipelines, without GIS teams.",
    category: "scout",
    categoryLabel: "Scout Platform",
    author: "GIS Career Hub",
    date: "August 2026",
    duration: "5 min read",
    url: "https://giscareerhub.com/blog/scout-a-cloud-native-geospatial-pipeline-powered-by-duckdb-geoparquet-pmtiles",
    headerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    intro: "Scout is Geosolvix's flagship platform, designed to compress weeks of geospatial engineering into a single browser session. Built on DuckDB Spatial, tippecanoe, and PMTiles v3, Scout ingests any cloud-hosted geospatial dataset and outputs a fully queryable, styled tile infrastructure — all open-standard, all CDN-distributed, all owned by you.",
    sections: [
      {
        title: "1. From URL to Tiles in 60 Seconds",
        text: "Scout's ingestion pipeline accepts any publicly accessible geospatial URL — GeoJSON, Shapefile, GeoPackage, or GeoParquet. DuckDB Spatial handles schema detection and coordinate validation while tippecanoe generates optimised PMTiles v3 archives at the correct zoom levels. The entire pipeline runs server-side with zero configuration from the user.",
      },
      {
        title: "2. AI SQL Explorer: Ask Claude in Plain English",
        text: "Scout integrates Claude AI to translate natural language questions into precise DuckDB Spatial SQL. Users can ask 'Show all buildings within 500 metres of the river' and watch the query execute and render on the map in real time. Claude reads the dataset schema automatically, ensuring syntactically correct queries every time.",
      },
      {
        title: "3. Open Standards: PMTiles, STAC, and Live XYZ Endpoints",
        text: "Every Scout dataset generates a PMTiles v3 archive, a STAC catalog item, and a live XYZ tile endpoint — all open standards. Tiles are published to Cloudflare R2 and served via global CDN. The XYZ endpoint works natively in QGIS, ArcGIS Pro, and any MapLibre or Mapbox GL application without additional configuration.",
      },
    ],
    conclusion: "Scout removes the infrastructure gap between raw geospatial data and a published, queryable tile layer — making professional-grade GIS accessible to anyone with a dataset URL. Read the full article on GIS Career Hub.",
  },
  {
    id: "blog-02",
    title: "DuckDB Spatial: The Engine Behind Modern Geospatial Pipelines",
    excerpt:
      "How DuckDB's vectorised execution engine and spatial extension replace heavyweight PostGIS setups — processing millions of geometries in seconds without a server.",
    category: "cloudnative",
    categoryLabel: "Cloud-Native GIS",
    author: "Geosolvix Engineering",
    date: "July 2026",
    duration: "6 min read",
    headerImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    intro:
      "DuckDB Spatial is reshaping how geospatial engineers think about data processing. By combining a columnar analytical engine with full OGC geometry support, it lets you run spatial SQL on GeoParquet, GeoJSON, and Shapefile inputs directly — no database server, no PostGIS installation, no infrastructure overhead. Scout is built on DuckDB Spatial at its core.",
    sections: [
      {
        title: "1. Columnar Execution Meets Geometry",
        text: "Traditional row-based databases process one record at a time. DuckDB organises data in columns and processes batches using vectorised SIMD instructions. When computing ST_Area across a million polygons, DuckDB evaluates entire columns in parallel, achieving speeds 10–100x faster than single-threaded geometry engines. This makes it ideal for the tile-generation pipelines Scout runs on every dataset ingestion.",
      },
      {
        title: "2. GeoParquet and Zero-Copy Reads",
        text: "DuckDB Spatial reads GeoParquet natively — including partitioned datasets hosted on Cloudflare R2 or S3 — using HTTP range requests. This means Scout can run spatial queries against remote datasets without downloading the entire file. Column pruning ensures only the geometry and required attribute columns are fetched, cutting bandwidth dramatically compared to GeoJSON or Shapefile pipelines.",
      },
      {
        title: "3. Full Spatial SQL Without a Server",
        text: "ST_Intersects, ST_Buffer, ST_Transform, ST_Area, ST_Distance — all standard spatial functions are available in DuckDB Spatial. Scout exposes these through Claude AI, letting users write natural language queries that get compiled to precise DuckDB SQL and executed in milliseconds. The entire query lifecycle runs inside the Scout API route — no external database, no connection pooling.",
      },
    ],
    conclusion:
      "DuckDB Spatial makes professional-grade spatial analytics accessible without server infrastructure, and it is the engine that gives Scout its 60-second pipeline performance.",
  },
  {
    id: "blog-03",
    title: "PMTiles v3: Serverless Vector Tile Distribution Without a Tile Server",
    excerpt:
      "How a single static file on Cloudflare R2 can serve billions of map tile requests without a tile server — and why PMTiles is the backbone of Scout's publish workflow.",
    category: "cloudnative",
    categoryLabel: "Cloud-Native GIS",
    author: "Geosolvix Engineering",
    date: "June 2026",
    duration: "5 min read",
    headerImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
    intro:
      "PMTiles is an open archive format that stores an entire tile pyramid inside a single file, indexed so that any individual tile can be retrieved via an HTTP range request. Scout generates a PMTiles v3 archive for every dataset it processes and publishes it to Cloudflare R2 — giving users a permanent, CDN-backed tile URL they own outright.",
    sections: [
      {
        title: "1. HTTP Range Requests: The Key Insight",
        text: "PMTiles works because modern browsers and HTTP clients support range requests — fetching a specific byte range from a file rather than the whole thing. PMTiles encodes a spatial index at the file header. When MapLibre GL requests tile Z/X/Y, the client reads the index (a few kilobytes), computes the byte offset of that tile, and fetches only those bytes. A 500 MB PMTiles file on R2 serves global tile requests with sub-100ms latency and zero server compute.",
      },
      {
        title: "2. Tippecanoe: Generating the Archive",
        text: "Scout uses tippecanoe — Mapbox's open-source tile generation tool — to compile input geometries into a PMTiles v3 archive. Tippecanoe handles zoom-level simplification, feature dropping at low zooms, and attribute filtering automatically. The result is an optimised tile archive where each zoom level contains the appropriate level of geometric detail without redundant data.",
      },
      {
        title: "3. Publishing to Cloudflare R2",
        text: "Once generated, Scout pushes the PMTiles archive to Cloudflare R2 using the S3-compatible API. R2's global network serves tiles via CDN with zero egress fees — meaning Scout users pay only for storage, not for bandwidth. The published URL is permanent and shareable directly into QGIS, ArcGIS Pro, Mapbox Studio, or any MapLibre GL JS application.",
      },
    ],
    conclusion:
      "PMTiles eliminates the tile server entirely, replacing it with a static file on commodity object storage. Scout makes generating and publishing PMTiles archives a single button click.",
  },
  {
    id: "blog-04",
    title: "STAC: Making Geospatial Datasets Machine-Readable and Discoverable",
    excerpt:
      "The SpatioTemporal Asset Catalog specification and how Scout auto-generates compliant STAC catalogs for every published dataset.",
    category: "cloudnative",
    categoryLabel: "Cloud-Native GIS",
    author: "Geosolvix Engineering",
    date: "June 2026",
    duration: "5 min read",
    headerImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    intro:
      "STAC (SpatioTemporal Asset Catalog) is the open standard that makes geospatial datasets discoverable by machines and humans alike. Scout automatically generates a valid STAC catalog item for every dataset it processes — including spatial extent, temporal metadata, asset links, and tile endpoint references — ensuring full OGC compliance out of the box.",
    sections: [
      {
        title: "1. What Is a STAC Item?",
        text: "A STAC item is a GeoJSON Feature enriched with standardised metadata fields: a unique ID, a bounding box, a datetime, a collection reference, and an assets dictionary linking to the actual data files. Scout populates all required fields automatically from the ingested dataset, writing the STAC JSON alongside the PMTiles archive in Cloudflare R2.",
      },
      {
        title: "2. Why STAC Matters for Government and Enterprise",
        text: "STAC-compliant datasets are indexable by standard catalog browsers like STAC Browser, Radiant Earth, and Microsoft Planetary Computer. Government GIS departments can point their SDI infrastructure at a Scout-generated STAC endpoint and immediately index all published datasets. Scout's Portolan SDI module passes OGC Rashid validation with 0 errors — making it ready for international GIS deployments.",
      },
      {
        title: "3. STAC + PMTiles + XYZ: The Scout Data Package",
        text: "Every Scout publish produces three artefacts: a PMTiles archive for serverless tile delivery, a live XYZ endpoint for compatibility with legacy GIS clients, and a STAC item linking both. Together they form a complete, interoperable data package that any modern GIS platform can consume without additional processing.",
      },
    ],
    conclusion:
      "STAC standardises how geospatial datasets are described and shared. Scout makes STAC catalog generation automatic — zero configuration, full compliance.",
  },
  {
    id: "blog-05",
    title: "GeoAI: Natural Language Querying of Spatial Datasets with LLMs",
    excerpt:
      "How Scout uses Claude AI to translate plain-English questions into DuckDB Spatial SQL — and why LLMs are transforming geospatial analytics.",
    category: "geoai",
    categoryLabel: "GeoAI & Analytics",
    author: "Geosolvix Engineering",
    date: "July 2026",
    duration: "6 min read",
    headerImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=600",
    intro:
      "The SQL Explorer in Scout lets any user — regardless of SQL knowledge — ask geospatial questions in plain English and get live results on the map. Behind the scenes, Claude reads the dataset schema, constructs a valid DuckDB Spatial query, executes it, and renders the result as a new map layer. This is GeoAI in practice.",
    sections: [
      {
        title: "1. Schema-Aware Query Generation",
        text: "The first challenge with LLM-generated SQL is hallucinated column names. Scout solves this by passing the full dataset schema — column names, data types, geometry type, CRS — to Claude as context before generating any query. Claude is instructed to reference only columns that exist in the schema, producing syntactically correct, executable SQL on the first attempt in over 95% of cases.",
      },
      {
        title: "2. From Natural Language to Spatial SQL",
        text: "A user asks: 'Show all buildings within 500 metres of the main river.' Claude translates this to a DuckDB Spatial query using ST_DWithin on the geometry columns, with the correct EPSG projection for the dataset. The query executes in milliseconds on DuckDB, returns a GeoJSON FeatureCollection, and MapLibre GL renders it as a new layer — all within a single round trip.",
      },
      {
        title: "3. Classification and Choropleth from AI Queries",
        text: "Scout's AI SQL Explorer is integrated with its classification engine. After a query returns numeric attributes, users can immediately apply quantile or equal-interval breaks and pick from 10 colour ramps to generate a choropleth visualisation. The entire workflow — from natural language question to styled map layer — takes under 10 seconds.",
      },
    ],
    conclusion:
      "GeoAI removes the SQL barrier from spatial analytics, making dataset exploration accessible to domain experts, planners, and decision-makers who have the questions but not the query skills.",
  },
  {
    id: "blog-06",
    title: "Building Cloud-Native Web GIS Applications with MapLibre GL",
    excerpt:
      "Why MapLibre GL JS is the open-source foundation for modern web mapping — and how Scout uses it to deliver GPU-accelerated vector tile rendering.",
    category: "webgis",
    categoryLabel: "Web GIS",
    author: "Geosolvix Engineering",
    date: "May 2026",
    duration: "5 min read",
    headerImage:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
    intro:
      "MapLibre GL JS is the open-source, community-maintained fork of Mapbox GL JS. It renders vector tiles natively on the GPU using WebGL, enabling smooth 60fps pan and zoom with full style control — no licensing fees, no vendor lock-in. Scout is built on MapLibre GL and exposes its full power through a no-code interface.",
    sections: [
      {
        title: "1. WebGL Vector Tile Rendering",
        text: "Unlike raster tile maps that deliver pre-rendered PNG images, MapLibre GL downloads raw vector tiles (.mvt format) and renders them on the client GPU. This means styles, labels, colours, and layer visibility can change instantly without a network request. Scout's choropleth engine modifies the MapLibre style spec in real time — reclassifying 10,000 features into a new colour ramp takes under 50 milliseconds.",
      },
      {
        title: "2. PMTiles Protocol Plugin",
        text: "Scout uses the official pmtiles.js MapLibre protocol plugin, which intercepts tile requests and translates them into HTTP range requests against the PMTiles archive on Cloudflare R2. This gives MapLibre GL direct access to Scout's published tile archives without any tile server. The plugin is open-source and compatible with all MapLibre GL versions from 3.x onwards.",
      },
      {
        title: "3. Basemap Switching and Layer Compositing",
        text: "Scout's map interface supports multiple basemap providers — OpenStreetMap, Satellite, Light, and Dark — with instant switching. User data layers are composited on top using MapLibre's layer ordering API. The Feature Inspector uses MapLibre's queryRenderedFeatures method to retrieve attribute data for any clicked feature from the tile cache, without a round-trip to the server.",
      },
    ],
    conclusion:
      "MapLibre GL gives Scout a world-class mapping foundation that is open, extensible, and free from vendor lock-in — the right choice for any modern web GIS application.",
  },
];

export const premiumGisTools = [
  {
    id: "tool-1",
    num: "1",
    icon: "FileSpreadsheet",
    title: "Cadastral & Land Parcel Management",
    subtitle: "Land parcel splitting, merging, valuation, & ownership tracking",
    excerpt:
      "A complete system to create, split, merge, and update land parcels with ownership history, valuation, and legal status. The single most used geospatial tool in every government worldwide — land registries, tax authorities, and courts depend on it daily.",
    description:
      "Process complex land plat split/merge requests, resolve spatial overlaps, compute real-time property values, and output legal-grade boundary registries.",
    details:
      "Maintains a secure, legal-grade digital registry of all property parcels. This module provides a single source of truth for land authorities, taxation departments, and judicial courts to track boundary legalities, easements, and ownership histories. Fully integrated with our Cloud Native Converter to import raw land plats.",
    thumbnail:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
    badge: "Cadastral Core",
  },
  {
    id: "tool-2",
    num: "2",
    icon: "MapPin",
    title: "Points of Interest & Facility Registry",
    subtitle:
      "Official centralized infrastructure, amenity, & facility catalog",
    excerpt:
      "A centrally maintained official database of every government facility — offices, hospitals, schools, courts, police stations — mapped with attributes, operating hours, jurisdiction, and capacity. The authoritative source all other systems reference.",
    description:
      "Centralize your enterprise administrative directories. Track public services, operating jurisdictions, live capacity matrices, and responder contact hierarchies.",
    details:
      "Organize, search, and update key administrative, public emergency, and utility facilities. By consolidating your physical infrastructure metadata into one spatial database connected to the Cloud Native Converter, other governmental sub-systems receive instant updates.",
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600",
    badge: "Authoritative POI",
  },
  {
    id: "tool-3",
    num: "3",
    icon: "Globe",
    title: "Basemap & Imagery Management",
    subtitle:
      "Self-hosted raster & vector tile servers powered by Cloud Native Converter",
    excerpt:
      "Authorities need to host, update, and serve their own official basemaps — not depend on Google or OpenStreetMap. National mapping agencies produce official topographic, cadastral, and aerial imagery that must be served securely within government infrastructure.",
    description:
      "Host high-definition sovereign vector and raster tiles on-prem or inside your private VPC. Translate raw GeoTIFF imagery and point clouds directly into client basemaps.",
    details:
      "Includes our high-efficiency Cloud Native Converter to ingest high-resolution aerial photography, digital elevation models, and custom terrain layers. Renders fluid topographic underlays instantly without leaking trace navigation parameters to external networks.",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    badge: "Sovereign Basemaps",
  },
  {
    id: "tool-4",
    num: "4",
    icon: "Map",
    title: "Zoning & Land Use Planning Tool",
    subtitle:
      "Interactive urban zoning policies, density limits, & easement bounds",
    excerpt:
      "Define, visualize, and enforce official zoning regulations on a map — residential, commercial, industrial, agricultural, protected areas. Planning authorities use this to approve or reject any development application based on what the zone allows.",
    description:
      "Proactive urban zone policy mapping. Run automatic geospatial checks on incoming residential, commercial, and safety setback layout configurations.",
    details:
      "Delineate regional polygons and assign maximum density thresholds, noise limits, and structural height caps. The zoning tool performs spatial validation against incoming building plans inside the Cloud Native Converter workspace to confirm compliance instantly.",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    badge: "Zoning & Planning",
  },
  {
    id: "tool-5",
    num: "5",
    icon: "History",
    title: "Change Detection & Version Control",
    subtitle:
      "Continuous spatial audit trails, historic slider rollback, & legal defensibility",
    excerpt:
      "Track every change made to any spatial data — who changed it, what it was before, and when. Authorities need a full history of boundary changes, parcel updates, and map edits for legal defensibility and audit compliance.",
    description:
      "Cryptographic, coordinate-level ledger systems. Document temporal modifications, plot adjustment histories, and user editing sessions automatically.",
    details:
      "Every coordinate alter, split action, or asset attribute modification compiles a cryptographic, chronological ledger. This ensures national cartographic agencies maintain a legally unassailable visual audit timeline powered by our Cloud Native Converter architecture.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    badge: "Version Audits",
  },
  {
    id: "tool-6",
    num: "6",
    icon: "Cloud",
    title: "Cloud Native Converter & Tiles Compiler",
    subtitle: "On-the-fly spatial asset conversion & vector basemap generation",
    excerpt:
      "Ditch heavy desktop GIS pipelines. Ingest multiple spatial dataset formats like raster GeoTIFFs, orthomosaics, and LiDAR point clouds directly into standard vector tiles in real-time.",
    description:
      "High-speed serverless mapping compiler. Seamlessly convert Shapefiles, GeoJSON, LAS Point Clouds, and high-fidelity aerial photos into highly optimized multi-zoom tiles.",
    details:
      "Integrates with modern cloud-optimized layouts and data structures to compile responsive interactive tile catalogs securely, served natively across government spatial platforms with zero third-party dependencies.",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
  },
];

// Preset sample customer case study points
export const customersList = [
  {
    name: "Walmart Distribution Network",
    location: "Bentonville, AR",
    rowsScanned: "4.2 Billion rows",
    processingSpeedup: "312% faster",
    cloudCostSaved: "68% savings",
    description:
      "Optimized delivery route structures and loading dock clearance catchments across 4,500 postal tracts in near-realtime. Direct in-database queries on BigQuery eliminated massive latency spikes.",
    icon: "DatabaseZap",
  },
  {
    name: "Uber Freight Logistics",
    location: "Chicago, IL",
    rowsScanned: "9.1 Billion rows",
    processingSpeedup: "410% faster",
    cloudCostSaved: "75% savings",
    description:
      "Aggregated real-time highway corridor metrics on severe weather cells to re-route freight trucks on the fly. Leveraged Snowflake schema unions with Zero-Copy latency benchmarks.",
    icon: "Cpu",
  },
  {
    name: "City of New York Transit Group",
    location: "New York, NY",
    rowsScanned: "1.8 Billion rows",
    processingSpeedup: "280% faster",
    cloudCostSaved: "82% savings",
    description:
      "Modeled pedestrian accessibility ratios around new subway station clusters. Created spatial buffer rings to target municipal zoning and infrastructure layout accurately.",
    icon: "Users",
  },
];
