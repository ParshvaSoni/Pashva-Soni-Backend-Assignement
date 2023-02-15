
# Pashva Soni Assignment

Hi, creating this small assignemnt for showcasing my skill in backend REST-FUll API development. 



## About Assignment

![App Screenshot](https://miro.medium.com/max/1400/1*FE2SydD7QgbvNqtKT7WVSA.gif)
- CRUD API for products.
- Following proper standards for REST API development.
- Using JOI for proper user input validation.
- Using Mongoose as NO-SQL Database.
- Documenting using swagger.


## API Reference

#### Get All Products

```http
  GET /products/all
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `--` | `--` | -- |
<hr>

#### Get Product By ID

```http
  GET /products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of product to fetch |

<hr>

#### Create New Product

```http
  Post /products/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `--`      | `--` | -- |

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Unique title of the product. |
| `description`      | `string` |Description of the product. |
| `imageURL`      | `string` |Image URL of the product. |
| `price`      | `string` |Price of the product. |
| `category`      | `string` |Category of the product. |

<hr>

#### Update Existing Product

```http
  Patch /products/update/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` |  **Required**. Id of product to fetch |

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Unique title of the product. |
| `description`      | `string` |Description of the product. |
| `imageURL`      | `string` |Image URL of the product. |
| `price`      | `string` |Price of the product. |
| `category`      | `string` |Category of the product. |

<hr>

#### Delete Existing Product

```http
  Delete /products/delete/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` |  **Required**. Id of product to fetch |

